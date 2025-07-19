import React, { useState, useRef } from 'react';
import { Trash2, Upload, Edit, Check, X } from 'lucide-react';

const AdminImageManager = () => {
  const [images, setImages] = useState([
    { id: 1, src: '/api/placeholder/400/300', alt: 'Product image 1', title: 'Product Title 1', description: 'Product description goes here.' },
    { id: 2, src: '/api/placeholder/400/300', alt: 'Product image 2', title: 'Product Title 2', description: 'Another product description goes here.' },
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ title: '', description: '' });
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // In a real implementation, you'd upload the file to a server
    // For demo purposes, we'll create a placeholder
    const newImageId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
    
    setImages([...images, {
      id: newImageId,
      src: '/api/placeholder/400/300',
      alt: `Uploaded image ${newImageId}`,
      title: file.name.split('.')[0],
      description: 'Edit to add a description'
    }]);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  const handleDeleteImage = (id) => {
    setImages(images.filter(img => img.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };
  
  const startEditing = (image) => {
    setEditingId(image.id);
    setEditValues({
      title: image.title,
      description: image.description
    });
  };
  
  const cancelEditing = () => {
    setEditingId(null);
  };
  
  const saveEditing = (id) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, title: editValues.title, description: editValues.description } : img
    ));
    setEditingId(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Image Manager</h2>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={handleUploadClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Upload size={18} />
            Upload Image
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map(image => (
          <div key={image.id} className="border rounded-lg overflow-hidden bg-gray-50">
            <div className="relative">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-48 object-cover"
              />
              <button 
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="p-4">
              {editingId === image.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editValues.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editValues.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={cancelEditing}
                      className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded flex items-center gap-1"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                    <button 
                      onClick={() => saveEditing(image.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Check size={16} />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <button 
                      onClick={() => startEditing(image)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                  <p className="text-gray-600">{image.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No images uploaded yet</p>
          <button 
            onClick={handleUploadClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center gap-2"
          >
            <Upload size={18} />
            Upload your first image
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminImageManager;