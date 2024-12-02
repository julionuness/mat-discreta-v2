import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";

const TreeNode = ({ node, onAddChild, onDeleteNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [isAddingChild, setIsAddingChild] = useState(false); 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddChild = () => {
    if (newChildName) {
      onAddChild(node.id, newChildName);
      setNewChildName(""); 
      setIsAddingChild(false); 
    }
  };

  const handleDeleteNode = () => {
    onDeleteNode(node.id);
  };

  return (
    <Box sx={{ ml: 3, mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
        <Button
          onClick={toggleExpand}
          sx={{ minWidth: 'auto', marginRight: 2 }}
        >
          {isExpanded ? "[-]" : "[+]"}
        </Button>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {node.name}
        </Typography>
        <Button
          onClick={handleDeleteNode}
          sx={{
            minWidth: 'auto',
            color: 'red',
            marginLeft: 2,
            padding: '5px',
          }}
        >
          ❌
        </Button>
        <Button
          onClick={() => setIsAddingChild(!isAddingChild)}
          sx={{
            minWidth: 'auto',
            marginLeft: 2,
            padding: '5px',
          }}
        >
          ➕
        </Button>
      </Box>
      {isExpanded && (
        <Box sx={{ ml: 2 }}>
          {isAddingChild && (
            <Box sx={{ mb: 1 }}>
              <TextField
                label="Novo arquivo..."
                variant="outlined"
                size="small"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button
                onClick={handleAddChild}
                variant="contained"
                sx={{ mb: 1 }}
              >
                Adicionar
              </Button>
            </Box>
          )}
          <Box sx={{ mt: 1 }}>
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                onAddChild={onAddChild}
                onDeleteNode={onDeleteNode}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const FileManager = () => {
  const [treeData, setTreeData] = useState([
    { id: 1, name: "Arquivo Pai", children: [] },
  ]);
  const [error, setError] = useState(null);

  const addChildToNode = (parentId, childName) => {
    const addNode = (node) => {
      if (node.id === parentId) {
        node.children.push({
          id: Date.now(),
          name: childName,
          children: [],
        });
      } else {
        node.children.forEach(addNode);
      }
    };

    const newTreeData = [...treeData];
    newTreeData.forEach(addNode);
    setTreeData(newTreeData);
  };

  const deleteNode = (nodeId) => {
    const removeNode = (nodes) => {
      return nodes.filter((node) => {
        if (node.id === nodeId) return false;
        node.children = removeNode(node.children);
        return true;
      });
    };

    setTreeData(removeNode(treeData));
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Gerenciador de Arquivos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        {treeData.map((rootNode) => (
          <TreeNode
            key={rootNode.id}
            node={rootNode}
            onAddChild={addChildToNode}
            onDeleteNode={deleteNode}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FileManager;
