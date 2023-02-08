package service

import (
	"api"
	"api/pkg/repository"
)

type OrganizationService struct {
	repo repository.Organization
}

func NewOrganizationService(repo repository.Organization) *OrganizationService {
	return &OrganizationService{repo: repo}
}

func (s *OrganizationService) Create(organization api.Organization) (int, error) {
	return s.repo.Create(organization)
}
