package service

import (
	"api"
	"api/pkg/repository"
	"crypto/sha1"
	"fmt"
)

const salt = "dfghjkweghkjhfgaHJ098BH"

type AuthService struct {
	repo repository.Authorization
}

func NewAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) CreateUser(user api.User) (int, error) {
	user.Password = generatePasswordHash(user.Password)

	return s.repo.CreateUser(user)
}

func (s *AuthService) Authorize(login, password string) (api.User, error) {
	user, err := s.repo.GetUser(login, generatePasswordHash(password))

	if err != nil {
		return api.User{}, err
	}

	return user, nil
}

func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))

	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}
