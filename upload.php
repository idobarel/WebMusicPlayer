<?php
    $req_files_name = $_POST['files_name'];
    $song_file = $_FILES['song_file'];
    $img_file = $_FILES['img_file'];


    $song_file_loc = "music/".$req_files_name.".mp3";
    $img_file_loc = "images/".$req_files_name.".jpg";


    if(move_uploaded_file($_FILES['song_file']['tmp_name'], $song_file_loc)){
        echo "Success";
    } else{
        echo "Failure";
    }
    if(move_uploaded_file($_FILES['img_file']['tmp_name'], $img_file_loc)){
        echo "Success";
    } else{
        echo "Failure";
    }
?>

