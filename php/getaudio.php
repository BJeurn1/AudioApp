<?php
    class FileInfo {
        public $directory;
        public $filter;
        public $volume;
        public $source;
        public $length;
        public $date;
    }

    $files = array();
    
    $filedir = '';
    
    foreach (new DirectoryIterator('../assets/audio') as $curfile) {
        if (strpos($curfile->getFilename(), '.mp3')) {
            $filedir = "./assets/audio/" . $curfile->getFilename();
        } else if (strpos($curfile->getFilename(), '.txt')) {
            $file = new FileInfo;

            $filedata = explode("|", file_get_contents("../assets/audio/" . $curfile->getFilename()));

            $file->directory = $filedir;
            $file->filter = $filedata[0];
            $file->volume = $filedata[1];
            $file->date = $filedata[2];
            $file->source = $filedata[3];
            $file->length = $filedata[4];

            $files[] = $file;
        }
    }

    echo json_encode($files);
?>