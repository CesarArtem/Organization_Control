package models

type Task struct {
	ID_Task     int    `json:"id_task" db:"id_task"`
	Name        string `json:"name" db:"name" binding:"required"`
	Description string `json:"description" db:"description" binding:"required"`
	Date_start  string `json:"date_Start" db:"date_Start" binding:"required"`
	Date_end    string `json:"date_End" db:"date_End" binding:"required"`
	Done        bool   `json:"done" db:"done"`
	Employee_ID int    `json:"employee_id" db:"employee_id"`
}
