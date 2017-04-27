var app = angular.module("TestApp", ["TestApp.controllers", "ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
    when("/", { templateUrl: "/OwnerViews/List.html", controller: "MainController" })
    
    .when("/OwnerDetail/:id",
    {
        templateUrl: "/OwnerViews/OwnerDetail.html",
        controller: "OwnerDetailsController"
    })
        .otherwise({ redirectTo: "/" })

}])

