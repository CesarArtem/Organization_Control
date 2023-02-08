package service

import (
	"api"
	"api/pkg/repository"
)

type Authorization interface {
	CreateUser(user api.User) (int, error)
	Authorize(login, password string) (api.User, error)
}

type Organization interface {
	Create(organization api.Organization) (int, error)
	//GetAll() ([]api.Organization, error)
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
