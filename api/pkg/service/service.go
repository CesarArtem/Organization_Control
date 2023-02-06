package service

import "api/pkg/repository"

type Authorization interface {
}

type Organization interface {
}

type Strategy interface {
}

type Service struct {
	Authorization
	Organization
	Strategy
}

func NewService(repos *repository.Repository) *Service {
	return &Service{}
}