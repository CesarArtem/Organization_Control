package models

type Task struct {
	ID_Task     int    `json:"id_Task" db:"id_Task" binding:"required"`
	Name        string `json:"name" db:"name" binding:"required"`
	Description string `json:"description" db:"description" binding:"required"`
	Date_start  string `json:"date_Start" db:"date_Start" binding:"required"`
	Date_end    string `json:"date_End" db:"date_End" binding:"required"`
	Done        bool   `json:"done" db:"done" binding:"required"`
	Employee_ID int    `json:"employee_ID" db:"employee_ID" binding:"required"`
}
