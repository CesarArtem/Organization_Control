package models

type Goal struct {
	ID_Goal       int    `json:"id_goal" db:"id_goal"`
	Name          string `json:"name" db:"name" binding:"required"`
	Description   string `json:"description" db:"description" binding:"required"`
	Date_start    string `json:"date_Start" db:"date_Start" binding:"required"`
	Date_end      string `json:"date_End" db:"date_End" binding:"required"`
	Done          bool   `json:"done" db:"done"`
	Department_ID int    `json:"department_id" db:"department_id"`
}
