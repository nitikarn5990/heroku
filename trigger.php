<?php


 require __DIR__ . '/vendor/autoload.php';
  //require(dirname(__FILE__).'/vendor/autoload.php');


  $options = array(
    'cluster' => 'ap1',
    'encrypted' => true
  );
  $pusher = new Pusher\Pusher(
    '051f16820e9bf8729f71',
    'e1000ba9da67b80de581',
    '401511',
    $options
  );

  $data['message'] = 'hello world';
  $pusher->trigger('my-channel', 'my-event', $data);
  echo 'xx';
?>
