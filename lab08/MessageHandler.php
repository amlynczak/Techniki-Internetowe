<?php
interface MessageInterface {
    public function _read();
    public function _save_messages($data);
    public function _read_messages();
}

class MessageHandler implements MessageInterface {
    private $file = 'notes.db';

    public function _read() {
        return $_POST;
    }

    public function _save_messages($data) {
        $messages = $this->_read_messages();
        $messages[] = $data;
        file_put_contents($this->file, json_encode($messages));
    }

    public function _read_messages() {
        if (file_exists($this->file)) {
            $content = file_get_contents($this->file);
            return json_decode($content, true);
        } else {
            return [];
        }
    }
}
?>