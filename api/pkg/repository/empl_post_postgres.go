package repository

import (
	"api/models"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type Employee_PostPostgres struct {
	db *sqlx.DB
}

func NewEmployee_PostPostgres(db *sqlx.DB) *Employee_PostPostgres {
	return &Employee_PostPostgres{db: db}
}

func (r *Employee_PostPostgres) Create(emplpost models.Employee_Post, idempl int) (models.Employee_Post, error) {
	var empl_post models.Employee_Post
	tx, err := r.db.Begin()
	if err != nil {
		return models.Employee_Post{}, err
	}

	var emplpostId int
	query := fmt.Sprintf("SELECT insert_employee_post($1, $2)")

	row := tx.QueryRow(query, emplpost.Post_ID, idempl)

	err = row.Scan(&emplpostId)
	if err != nil {
		tx.Rollback()
		return models.Employee_Post{}, err
	}
	tx.Commit()

	empl_post, err = r.GetById(emplpostId, idempl)
	if err != nil {
		return models.Employee_Post{}, err
	}

	return empl_post, err
}

func (r *Employee_PostPostgres) GetAll(idempl int) ([]models.Employee_Post, error) {
	var emplpost []models.Employee_Post
	query := fmt.Sprintf("SELECT * FROM %s WHERE Employee_id=$1", apiEmplPostTable)

	err := r.db.Select(&emplpost, query, idempl)

	return emplpost, err
}

func (r *Employee_PostPostgres) GetById(id int, idempl int) (models.Employee_Post, error) {
	var Employee_Post models.Employee_Post
	query := fmt.Sprintf("SELECT * FROM %s WHERE id_Employee_Post=$1 AND Employee_id=$2", apiEmplPostTable)

	err := r.db.Get(&Employee_Post, query, id, idempl)

	return Employee_Post, err
}

func (r *Employee_PostPostgres) Delete(id int, idempl int) error {
	idemplpost := "id_Employee_Post"
	query := fmt.Sprintf("SELECT delete_row($1, $2, $3)")

	_, err := r.db.Exec(query, apiEmplPostTable, idemplpost, id)

	return err
}

func (r *Employee_PostPostgres) Update(id int, Employee_Post models.Employee_Post, idempl int) (models.Employee_Post, error) {
	var emplpost models.Employee_Post

	query := fmt.Sprintf("SELECT update_Employee_Post($1, $2, $3, $4, $5)")

	_, err := r.db.Exec(query, id, Employee_Post.Post_ID, idempl)

	emplpost, _ = r.GetById(id, idempl)

	return emplpost, err
}
