package models

type Employee struct {
	ID_Employee int    `json:"id_Employee" db:"id_Employee"`
	Surname     string `json:"surname" db:"surname" binding:"required"`
	Name        string `json:"name" db:"name" binding:"required"`
	SecondName  string `json:"secondname" db:"secondname" binding:"required"`
	Date_Birth  string `json:"date_Birth" db:"date_Birth" binding:"required"`
	SeriaPasp   string `json:"seriaPasp" db:"seriaPasp" binding:"required"`
	NumberPasp  string `json:"numberPasp" db:"numberPasp" binding:"required"`
	Email       string `json:"email" db:"email" binding:"required"`
	User_ID     int    `json:"user_ID" db:"user_ID"`
}
