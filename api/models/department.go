package models

type Department struct {
	ID_Department   int    `json:"id_Department" db:"id_Department"`
	Name            string `json:"name" db:"name" binding:"required"`
	Description     string `json:"description" db:"description" binding:"required"`
	Organization_ID int    `json:"organization_ID" db:"organization_ID"`
}
