package repository

import (
	"api"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type OrganizationPostgres struct {
	db *sqlx.DB
}

func NewOrganizationPostgres(db *sqlx.DB) *OrganizationPostgres {
	return &OrganizationPostgres{db: db}
}

func (r *OrganizationPostgres) Create(item api.Organization) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var organizationId int
	createItemQuery := fmt.Sprintf("INSERT INTO %s (name, addres, inn, budget, date_foundation) VALUES ($1, $2, $3, $4, $5) RETURNING id_organization", apiOrganizationTable)

	row := tx.QueryRow(createItemQuery, item.Name, item.Addres, item.INN, item.Budget, item.Date_Foundation)

	err = row.Scan(&organizationId)
	if err != nil {
		tx.Rollback()
		return 0, err
	}

	return organizationId, tx.Commit()
}
