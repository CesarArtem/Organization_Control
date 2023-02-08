package handler

import (
	"api/pkg/service"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()
	auth := router.Group("/auth")
	{
		auth.POST("sign-up", h.signUp)
		auth.POST("sign-in", h.signIn)
	}

	api := router.Group("/api")
	{
		lists := api.Group("/organization")
		{
			lists.POST("/", h.createOrganization)
			lists.GET("/", h.getAllOrganization)
			lists.GET("/:id", h.getOrganization)
			lists.PUT("/:id", h.updateOrganization)
			lists.DELETE("/:id", h.deleteOrganization)

			items := lists.Group(":id/strategy")
			{
				items.POST("/", h.createStrategy)
				items.GET("/", h.getAllStrategies)
				items.GET("/:item_id", h.getStrategyById)
				items.PUT("/:item_id", h.updateStrategy)
				items.DELETE("/:item_id", h.deleteStrategy)
			}
		}
	}

	return router
}
