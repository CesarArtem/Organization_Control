package repository

import (
	"api"
	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user api.User) (int, error)
	GetUser(login, password string) (api.User, error)
}

type Organization interface {
	Create(organization api.Organization) (int, error)
}

type Strategy interface {
}

type Repository struct {
	Authorization
	Organization
	Strategy
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		Organization:  NewOrganizationPostgres(db),
	}
}
