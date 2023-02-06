package api

type Strategy struct {
	ID_Strategy     int    `json:"-"`
	Name            string `json:"name"`
	Description     string `json:"description"`
	Date_start      string `json:"date_Start"`
	Date_end        string `json:"date_End"`
	Done            bool   `json:"done"`
	Organization_ID int    `json:"organization_ID"`
}
