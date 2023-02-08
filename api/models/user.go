package models

type User struct {
	Id_user  int    `json:"id_user"`
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}
