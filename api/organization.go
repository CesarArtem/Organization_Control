package api

import "github.com/shopspring/decimal"

type Organization struct {
	Id_Organization int             `json:"id_organization"`
	Name            string          `json:"name" binding:"required"`
	Addres          string          `json:"addres" binding:"required"`
	INN             string          `json:"inn" binding:"required"`
	Budget          decimal.Decimal `json:"budget" binding:"required"`
	Date_Foundation string          `json:"date_foundation" binding:"required"`
}
