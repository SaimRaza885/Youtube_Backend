import { useState, useRef, useCallback } from 'react'
import { X, Upload, FileVideo, CheckCircle } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { Button, Input, Textarea } from './index'

export const UploadModal = () => {
  const { showUploadModal, setShowUploadModal, addNotification } = useUI()
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', file: null, thumbnail: null })
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)
  const thumbInputRef = useRef(null)

  if (!showUploadModal) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleFileSelect = (files, field) => {
    if (files && files[0]) {
      setForm((p) => ({ ...p, [field]: files[0] }))
      if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }))
    }
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const videoFile = Array.from(files).find(f => f.type.startsWith('video/'))
      if (videoFile) {
        setForm((p) => ({ ...p, file: videoFile }))
        if (errors.file) setErrors((p) => ({ ...p, file: '' }))
      }
    }
  }, [errors])

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!form.title) err.title = 'Title is required'
    if (!form.file) err.file = 'Video file is required'
    if (Object.keys(err).length > 0) { setErrors(err); return }

    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      addNotification('Video uploaded successfully!', 'success')
      setShowUploadModal(false)
      setForm({ title: '', description: '', file: null, thumbnail: null })
    } catch (err) {
      addNotification('Upload failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowUploadModal(false)}>
      <div className="bg-[#14141F] border border-[#2A2A42] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_16px_48px_rgba(0,0,0,0.5)]" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#14141F] flex items-center justify-between p-5 border-b border-[#2A2A42] rounded-t-xl">
          <h2 className="text-lg font-bold text-[#F0F0F8] flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#8B5CF6]" strokeWidth={2.5} />
            Upload Video
          </h2>
          <button onClick={() => setShowUploadModal(false)} className="text-[#6B6B80] hover:text-[#F0F0F8] p-1.5 rounded-full hover:bg-[#1C1C2E] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
              form.file
                ? 'border-[#22C55E] bg-[#22C55E]/5'
                : dragOver
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 scale-[1.02]'
                  : 'border-[#2A2A42] hover:border-[#8B5CF6]/50 hover:bg-[#1C1C2E]'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files, 'file')}
            />
            {form.file ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-10 h-10 text-[#22C55E]" />
                <p className="text-sm font-medium text-[#F0F0F8]">{form.file.name}</p>
                <p className="text-xs text-[#6B6B80]">Click or drag to change file</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#1C1C2E] flex items-center justify-center mb-1">
                  <FileVideo className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <p className="text-sm font-medium text-[#F0F0F8]">
                  {dragOver ? 'Drop your video here' : 'Drag & drop your video here'}
                </p>
                <p className="text-xs text-[#6B6B80]">or click to browse files</p>
                <p className="text-[10px] text-[#6B6B80]/60 mt-1">MP4, MOV, AVI up to 2GB</p>
              </div>
            )}
          </div>
          {errors.file && <p className="text-red-400 text-xs -mt-4">{errors.file}</p>}

          <Input label="Video Title" type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter a catchy title" error={errors.title} />
          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Describe your video to viewers" rows={3} />

          <div>
            <label className="block text-sm font-medium text-[#F0F0F8] mb-2">Thumbnail</label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 cursor-pointer ${
                form.thumbnail ? 'border-[#22C55E] bg-[#22C55E]/5' : 'border-[#2A2A42] hover:border-[#8B5CF6]/50 hover:bg-[#1C1C2E]'
              }`}
              onClick={() => thumbInputRef.current?.click()}
            >
              <input
                ref={thumbInputRef}
                type="file"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files, 'thumbnail')}
              />
              {form.thumbnail ? (
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                  <span className="text-sm text-[#F0F0F8]">{form.thumbnail.name}</span>
                </div>
              ) : (
                <p className="text-sm text-[#6B6B80]">Click to upload thumbnail image</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button fullWidth variant="secondary" onClick={() => setShowUploadModal(false)} type="button">Cancel</Button>
            <Button fullWidth loading={loading} type="submit">Publish</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
