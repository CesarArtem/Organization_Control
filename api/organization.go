package api

import "github.com/shopspring/decimal"

type Organization struct {
	Id_Organization int             `json:"-"`
	Name            string          `json:"name"`
	Addres          string          `json:"addres"`
	INN             string          `json:"inn"`
	Budget          decimal.Decimal `json:"budget"`
	Date_Foundation string          `json:"name"`
}
