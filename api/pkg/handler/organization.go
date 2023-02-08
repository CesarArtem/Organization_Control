package handler

import (
	"api"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) createOrganization(c *gin.Context) {

	var input api.Organization
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.Organization.Create(input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (h *Handler) getOrganization(c *gin.Context) {

}

func (h *Handler) updateOrganization(c *gin.Context) {

}

func (h *Handler) deleteOrganization(c *gin.Context) {

}
