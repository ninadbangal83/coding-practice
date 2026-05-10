import React, { useState } from 'react';
import './NestedComments.css';

// INITIAL MOCK DATA (Deep recursive tree)
const INITIAL_DATA = [
  {
    id: 1,
    author: 'System Architect',
    text: 'Welcome to the root of the recursive render tree.',
    replies: [
      {
        id: 2,
        author: 'Sub Component',
        text: 'I am a second-tier component nested within my parent.',
        replies: [
          { id: 3, author: 'Recursive Node', text: 'Level 3 reached successfully.', replies: [] }
        ]
      }
    ]
  }
];

// 🛸 THE RECURSIVE ENGINE SUB-COMPONENT
const CommentNode = ({ comment, onAddReply, onDelete }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyVal, setReplyVal] = useState('');

  const submitReply = () => {
    if (!replyVal.trim()) return;
    onAddReply(comment.id, replyVal);
    setReplyVal('');
    setIsReplying(false);
  };

  return (
    <div className="comment-block">
      <div className="comment-content-rect">
        <strong className="author-tag">{comment.author}</strong>
        <p className="text-body">{comment.text}</p>
        
        <div className="comment-actions">
          <button onClick={() => setIsReplying(!isReplying)} className="act-link">Reply</button>
          <button onClick={() => onDelete(comment.id)} className="act-link delete">Delete</button>
        </div>

        {isReplying && (
          <div className="reply-input-row">
            <input 
              autoFocus
              value={replyVal} 
              onChange={(e) => setReplyVal(e.target.value)} 
              placeholder="Write a reply..."
            />
            <button onClick={submitReply}>Post</button>
          </div>
        )}
      </div>

      {/* 🔥 RECURSION HAPPENS HERE: Component renders itself for any downstream children */}
      {comment.replies.length > 0 && (
        <div className="replies-branch">
          {comment.replies.map(reply => (
            <CommentNode 
              key={reply.id} 
              comment={reply} 
              onAddReply={onAddReply} 
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// MAIN EXPORTED SHELL
const NestedComments = () => {
  const [comments, setComments] = useState(INITIAL_DATA);

  // Standard immutable recursive update logic
  const addReplyToTree = (list, targetId, newText) => {
    return list.map(node => {
      if (node.id === targetId) {
        return {
          ...node,
          replies: [...node.replies, { id: Date.now(), author: 'Current User', text: newText, replies: [] }]
        };
      }
      return { ...node, replies: addReplyToTree(node.replies, targetId, newText) };
    });
  };

  const deleteFromTree = (list, targetId) => {
    return list
      .filter(node => node.id !== targetId)
      .map(node => ({ ...node, replies: deleteFromTree(node.replies, targetId) }));
  };

  const handleAddReply = (id, text) => setComments(prev => addReplyToTree(prev, id, text));
  const handleDelete = (id) => setComments(prev => deleteFromTree(prev, id));

  return (
    <div className="react-card bigger-card">
      <h2>Recursive Thread Engine</h2>
      <p className="sub-meta">Mastery Challenge: Component tree utilizing base cases to safely render itself recursively.</p>
      
      <div className="thread-viewport">
        {comments.map(rootNode => (
          <CommentNode 
            key={rootNode.id} 
            comment={rootNode} 
            onAddReply={handleAddReply} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedComments;
