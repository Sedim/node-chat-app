 var arr = [
 	{
 		"id": "1",
 		"name": "Sedim",
 		"room": "The room"
  },
 	{
 		"id": "2",
 		"name": "Andrew2",
 		"room": "Room 2"
  },
 	{
 		"id": "2",
 		"name": "Andrew5",
 		"room": "Room 3"
  },
 	{
 		"id": "1",
 		"name": "Andrew4",
 		"room": "Room 4"
  }
];

 // console.log(myarray);
 // var myid = 2;
 // var result = arr.filter(function(myid) {
 // 	console.log(myid)
 // 	return arr.id == myid
 // });
 //
 // console.log(result);

 var id = 1;
 var arrayFound = arr.filter(function(item) {
 	return item.id == id;
 });
 console.log(arrayFound);









 // var items = [
 // 	{ itemId: 1, isRight: 0 },
 // 	{ itemId: 2, isRight: 1 },
 // 	{ itemId: 3, isRight: 0 }
 // ]
 //
 // var isRight = 1
 // var arrayFound = items.filter(function(item) {
 // 	return item.isRight == isRight;
 // });
 // console.log(arrayFound);



 // var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
 // var myvar = "limit";
 // var id = "1"
 // var longWords = arr.filter(function(word) {
 // 	return arr.id = 1;
 // });
 // console.log(longWords);
