(()=>{

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


    stromsy.app.controller('homeCtrl', function($scope, $http, $sce, $compile) {

        scope = $scope;
	    
        $scope.toggleVote = function(post) {
            
            post.is_voted = !post.is_voted;
            
            if (post.is_voted) {
                post.num_points++;
            } else {
                post.num_points--;
            }
            
        }

        $scope.populatePosts = function() {
            
            console.log("populatePosts()");
            
            for (let i = 0; i < 10; i++) {
                
                let post = {};
                
                post.post_id = stromsy.random.integer(Math.pow(10, 12));
                post.is_voted = false;
                post.num_points = stromsy.random.integer(1000);
                post.num_comments = stromsy.random.integer(150);
                post.time = stromsy.random.integer(12) + " hours ago";
                post.title = stromsy.random.choice(titles);
                post.author = stromsy.random.choice(users);
                post.url = stromsy.random.choice(urls);
                
                post.tags = [];
                for (let j = 0; j < stromsy.random.integer(3)+1; j++) {
                    let tag = {
                        text: stromsy.random.choice(tags)
                    };
                    post.tags.push(tag);
                }
                
                $scope.posts.push(post);
                
            }
        };

        $scope.clearAndPopulatePosts = function() {
            
            $scope.posts = [];
            $scope.populatePosts();
            
        };
        
        $scope.posts = []
        $scope.clearAndPopulatePosts();

    });

})();
