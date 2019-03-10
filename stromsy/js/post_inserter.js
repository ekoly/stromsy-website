(()=>{
	
	const self = this;
	let scope;

	const randomChoice = (arr) => arr[Math.floor(Math.random()*arr.length)];
	const randInt = (ceil) => Math.floor(Math.random()*ceil);

	const tags = [
			"draw.io",
			"information architecture",
			"wireframes",
			"ux",
			"fdm group",
			"java",
			"html",
			"js",
			"xml",
			"css",
			"currency conversion",
			"AI",
			"singleton",
			"factory pattern",
			"mockito",
			"junit",
			"log4js",
			"flyweight",
			"machicolations",
			"python",
			"eclipse"
		],
	    users = ["alex", "j", "erik", "tacho", "chun", "roy", "jesus", "jarod", "clark"],
	    titles = [
			"What is UX",
			"Design Considerations",
			"Java Generics",
			"Java Collections",
			"UML",
			"Threading Theory",
			"Clean Code",
			"Maven",
			"Java Syntax",
			"How to do IO in Java",
			"How to do Serialization in Java",
			"SOLID Design Principles",
			"Liskov Substitution Principle",
			"Interface Segregation Principle",
			"Polymorphism",
			"Abstraction",
			"Encapsulation",
			"Inheritence",
			"Single Dependency Principle",
			"Open Closed Principle",
			"Dependency Inversion Principle",
			"Use Case Diagrams Do Not Show Flow"
		],
		urls = [
			"https://www.ribbonfarm.com",
			"https://news.ycombinator.com",
			"https://www.fdmgroup.com",
			"https://www.hackertyper.com",
			"https://www.lingswings.com",
			"https://www.lingscars.com",
			"https://www.wikipedia.org",
			"https://fontawesome.com",
			"https://www.w3schools.com",
			"https://www.duolingo.com",
			"https://www.coursera.org",
			"https://www.reddit.com",
			"https://leetcode.com",
			"https://www.hackerrank.com",
			"https://www.gutenberg.org"
		];



	const toggleVote = function(post) {
		
		post.is_voted = !post.is_voted;
		
		if (post.is_voted) {
			post.num_points++;
		} else {
			post.num_points--;
		}
		
	}

	const populatePosts = function() {
		
		console.log("populatePosts()");
		
		for (let i = 0; i < 10; i++) {
			
			let post = {};
			
			post.post_id = randInt(Math.pow(10, 12));
			post.is_voted = false;
			post.num_points = randInt(1000);
			post.num_comments = randInt(150);
			post.time = randInt(12) + " hours ago";
			post.title = randomChoice(titles);
			post.author = randomChoice(users);
			post.url = randomChoice(urls);
			
			post.tags = [];
			for (let j = 0; j < randInt(3)+1; j++) {
				let tag = {
					text: randomChoice(tags)
				};
				post.tags.push(tag);
			}
			
			scope.posts.push(post);
			
		}
	};

	const clearAndPopulatePosts = function() {
		
		scope.posts = [];
		populatePosts();
		
	};

	const app = angular.module('StromsyApp', []);

    // app.directive("ngMainContentArea", ()=>{

        // return {
            // templateUrl: (elem, attr)=>{
                // return "about-template.html";
            // }
        // };

    // });

	app.controller('mainCtrl', function($scope, $http, $sce, $compile) {

		scope = $scope;

        $scope.goToHome = ()=> {

            console.log("goToHome()");

            document.getElementById("main-content-area").innerHTML="";
            
            $http({
                url: "home-template.html",
                method: "GET"
            }).then((template)=>{
                document.getElementById("main-content-area").innerHTML=template.data;
                $compile(document.getElementById("main-content-area"))($scope);
                $scope.clearAndPopulatePosts();
            }, ()=>{
                console.log("Error fetching url!");
            });

        };

        $scope.goToAbout = ()=> {

            console.log("goToAbout()");

            document.getElementById("main-content-area").innerHTML="";
            
            $http({
                url: "about-template.html",
                method: "GET"
            }).then((template)=>{
                document.getElementById("main-content-area").innerHTML=template.data;
                $compile(document.getElementById("main-content-area"))($scope);
            }, ()=>{
                console.log("Error fetching url!");
            });

        };
        
        $scope.goToLinks = ()=> {

            console.log("goToLinks()");

            document.getElementById("main-content-area").innerHTML="";
            
            $http({
                url: "links.html",
                method: "GET"
            }).then((template)=>{
                document.getElementById("main-content-area").innerHTML=template.data;
                $compile(document.getElementById("main-content-area"))($scope);
            }, ()=>{
                console.log("Error fetching url!");
            });


        };

		$scope.toggleVote = toggleVote;
		$scope.populatePosts = populatePosts;
		$scope.clearAndPopulatePosts = clearAndPopulatePosts;
		
		$scope.posts = []
		$scope.goToHome();

	});
	
})();
