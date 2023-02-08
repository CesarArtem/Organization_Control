package models

type Strategy struct {
	ID_Strategy     int    `json:"ID_Strategy" db:"ID_Strategy" binding:"required"`
	Name            string `json:"name" db:"name" binding:"required"`
	Description     string `json:"description" db:"description" binding:"required"`
	Date_start      string `json:"date_Start" db:"date_Start" binding:"required"`
	Date_end        string `json:"date_End" db:"date_End" binding:"required"`
	Done            bool   `json:"done" db:"done" binding:"required"`
	Organization_ID int    `json:"organization_ID" db:"organization_ID" binding:"required"`
}
