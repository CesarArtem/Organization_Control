package service

import (
	"api/models"
	"api/pkg/repository"
)

type Authorization interface {
	CreateUser(user models.User) (int, error)
	Authorize(login, password string) (models.User, error)
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

type Service struct {
	Authorization
	Organization
	Strategy
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		Organization:  NewOrganizationService(repos.Organization),
	}
}
