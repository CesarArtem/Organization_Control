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

			strategy := lists.Group(":id/strategy")
			{
				strategy.POST("/", h.createStrategy)
				strategy.GET("/", h.getAllStrategies)
				strategy.GET("/:strategy_id", h.getStrategyById)
				strategy.PUT("/:strategy_id", h.updateStrategy)
				strategy.DELETE("/:strategy_id", h.deleteStrategy)
			}

			operations := lists.Group(":id/operation")
			{
				operations.POST("/", h.createOperation)
				operations.GET("/", h.getAllOperation)
				operations.GET("/:operation_id", h.getOperation)
				operations.PUT("/:operation_id", h.updateOperation)
				operations.DELETE("/:operation_id", h.deleteOperation)
			}

			department := lists.Group(":id/department")
			{
				department.POST("/", h.createStrategy)
				department.GET("/", h.getAllStrategies)
				department.GET("/:department_id", h.getStrategyById)
				department.PUT("/:department_id", h.updateStrategy)
				department.DELETE("/:department_id", h.deleteStrategy)

				goals := lists.Group(":department_id/goal")
				{
					goals.POST("/", h.createStrategy)
					goals.GET("/", h.getAllStrategies)
					goals.GET("/:goal_id", h.getStrategyById)
					goals.PUT("/:goal_id", h.updateStrategy)
					goals.DELETE("/:goal_id", h.deleteStrategy)
				}

				post := lists.Group(":department_id/post")
				{
					post.POST("/", h.createStrategy)
					post.GET("/", h.getAllStrategies)
					post.GET("/:post_id", h.getStrategyById)
					post.PUT("/:post_id", h.updateStrategy)
					post.DELETE("/:post_id", h.deleteStrategy)
				}

				employee := lists.Group(":department_id/employee")
				{
					employee.POST("/", h.createStrategy)
					employee.GET("/", h.getAllStrategies)
					employee.GET("/:employee_id", h.getStrategyById)
					employee.PUT("/:employee_id", h.updateStrategy)
					employee.DELETE("/:employee_id", h.deleteStrategy)

					task := lists.Group(":employee_id/task")
					{
						task.POST("/", h.createStrategy)
						task.GET("/", h.getAllStrategies)
						task.GET("/:task_id", h.getStrategyById)
						task.PUT("/:task_id", h.updateStrategy)
						task.DELETE("/:task_id", h.deleteStrategy)
					}

					user := lists.Group(":employee_id/user")
					{
						user.POST("/", h.createStrategy)
						user.GET("/", h.getAllStrategies)
						user.GET("/:user_id", h.getStrategyById)
						user.PUT("/:user_id", h.updateStrategy)
						user.DELETE("/:user_id", h.deleteStrategy)
					}

					empl_post := lists.Group(":employee_id/emplpost")
					{
						empl_post.POST("/", h.createStrategy)
						empl_post.GET("/", h.getAllStrategies)
						empl_post.GET("/:emplpost_id", h.getStrategyById)
						empl_post.PUT("/:emplpost_id", h.updateStrategy)
						empl_post.DELETE("/:emplpost_id", h.deleteStrategy)
					}
				}
			}
		}
	}

	return router
}
