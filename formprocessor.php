<body>

<?php
$coffee = $_POST["coffee"];
$flavor = $_POST["flavor"];
$body = $_POST["body"];
$ft = $_POST["ft"];
$cup = $_POST["cup"];
$location = $_POST["location"];

parse_str($_POST['data'],$newarray);
echo json_encode($newarray);
?>

</body>
