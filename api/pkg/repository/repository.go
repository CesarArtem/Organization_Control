package repository

import "github.com/jmoiron/sqlx"

type Authorization interface {
}

type Organization interface {
}

type Strategy interface {
}

type Repository struct {
	Authorization
	Organization
	Strategy
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{}
}
