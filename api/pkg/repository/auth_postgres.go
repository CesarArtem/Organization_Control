package repository

import (
	"api"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (r *AuthPostgres) CreateUser(user api.User) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (login, password) VALUES ($1, $2) RETURNING id_user", usersTable)

	row := r.db.QueryRow(query, user.Login, user.Password)

	fmt.Printf("INSERT INTO %s (login, password) VALUES (%v, %v) RETURNING id_user", usersTable, user.Login, user.Password)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}
	return id, nil
}

func (r *AuthPostgres) GetUser(login, password string) (api.User, error) {
	var user api.User
	query := fmt.Sprintf("SELECT id_user FROM %s WHERE login=$1 AND password=$2", usersTable)
	err := r.db.Get(&user, query, login, password)

	return user, err
}
