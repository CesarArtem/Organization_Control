package repository

import (
	"api/models"
	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user models.User) (int, error)
	GetUser(login, password string) (models.User, error)
}

type Organization interface {
	Create(organization models.Organization) (models.Organization, error)
	GetAll() ([]models.Organization, error)
	GetById(id int) (models.Organization, error)
	Delete(id int) error
	Update(id int, organization models.Organization) (models.Organization, error)
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
