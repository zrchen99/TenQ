import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ChatItem.scss'; // Import the SASS stylesheet

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return (
    <Box className={`chat-item ${role}`}>
      {role === 'assistant' ? (
        <Avatar className="avatar assistant-avatar">
          <img src="openai.png" alt="openai" width="30px" />
        </Avatar>
      ) : (
        <Avatar className="avatar user-avatar">
          {auth?.user?.name[0]}
        </Avatar>
      )}
      <Box className="message-container">
        {!messageBlocks && (
          <Typography className="message">{content}</Typography>
        )}
        {messageBlocks && messageBlocks.map((block, index) => (
          isCodeBlock(block) ? (
            <SyntaxHighlighter key={index} style={coldarkDark} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} className="message">{block}</Typography>
          )
        ))}
      </Box>
    </Box>
  );
};

export default ChatItem;