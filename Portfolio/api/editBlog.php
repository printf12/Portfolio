<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Sanitize.
  $id = mysqli_real_escape_string($con, (int)($request->id));
  $image = mysqli_real_escape_string($con, trim($request->image));
  $title  = mysqli_real_escape_string($con, trim($request->title));
  $description  = mysqli_real_escape_string($con, trim($request->description));
  $creationDate  = mysqli_real_escape_string($con, trim($request->creationDate));
  $blogType  = mysqli_real_escape_string($con, trim($request->blogType));

  $sql = "UPDATE `blogs` SET `image`=$image, `description`=$description, `creationDate`=$creationDate, `title`=$title, `blogType`=$blogType where id=$id ";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $blog = [
      'image' => $image,
      'description' => $description,
      'creationDate' => $creationDate,
      'title' => $title,
      'blogType' => $blogType,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($blog);
  }
  else
  {
    http_response_code(422);
  }
}







