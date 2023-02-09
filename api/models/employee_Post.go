package models

type Employee_Post struct {
	ID_Employee_Post int `json:"id_Employee_Post" db:"id_Employee_Post"`
	Post_ID          int `json:"post_ID" db:"post_ID"`
	Employee_ID      int `json:"employee_ID" db:"employee_ID"`
}
