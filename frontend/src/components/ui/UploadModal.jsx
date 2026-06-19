import { useState, useRef, useCallback } from 'react'
import { X, Upload, FileVideo, CheckCircle } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { Button, Input, Textarea } from './index'

export const UploadModal = () => {
  const { showUploadModal, setShowUploadModal, addNotification, addUpload, updateUpload } = useUI()
  const [dragOver, setDragOver] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', file: null, thumbnail: null })
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)
  const thumbInputRef = useRef(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const videoFile = Array.from(files).find(f => f.type.startsWith('video/'))
      if (videoFile) {
        setForm((p) => ({ ...p, file: videoFile }))
      }
    }
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!form.title) err.title = 'Title is required'
    if (!form.description) err.description = 'Description is required'
    if (!form.file) err.file = 'Video file is required'
    if (Object.keys(err).length > 0) { setErrors(err); return }

    const uploadId = Date.now()
    const fileName = form.file.name

    addUpload(uploadId, fileName)
    setShowUploadModal(false)
    setForm({ title: '', description: '', file: null, thumbnail: null })

    try {
      const { videoAPI } = await import('../../services/endpoints')
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('videoFile', form.file)
      if (form.thumbnail) formData.append('thumbnail', form.thumbnail)
      await videoAPI.uploadVideo(formData, (e) => {
        const pct = Math.round((e.loaded / e.total) * 100)
        updateUpload(uploadId, { progress: pct })
      })
      updateUpload(uploadId, { progress: 100, status: 'done' })
      addNotification('Video uploaded successfully!', 'success')
    } catch {
      updateUpload(uploadId, { status: 'error' })
      addNotification('Upload failed. Please try again.', 'error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowUploadModal(false)}>
      <div className="bg-secondary border border-border-subtle rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-secondary flex items-center justify-between p-5 border-b border-border-subtle rounded-t-xl">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Upload className="w-5 h-5 text-accent" strokeWidth={2.5} />
            Upload Video
          </h2>
          <button onClick={() => setShowUploadModal(false)} className="text-text-tertiary hover:text-text-primary p-1.5 rounded-full hover:bg-tertiary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
              form.file
                ? 'border-state-success bg-state-success/5'
                : dragOver
                  ? 'border-accent bg-accent-muted scale-[1.02]'
                  : 'border-border-subtle hover:border-accent/50 hover:bg-tertiary'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={(e) => { e.preventDefault(); setDragOver(false) }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" name="file" accept="video/*" className="hidden" onChange={(e) => handleFileSelect(e.target.files, 'file')} />
            {form.file ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-10 h-10 text-state-success" />
                <p className="text-sm font-medium text-text-primary">{form.file.name}</p>
                <p className="text-xs text-text-tertiary">Click or drag to change file</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center mb-1">
                  <FileVideo className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-medium text-text-primary">{dragOver ? 'Drop your video here' : 'Drag & drop your video here'}</p>
                <p className="text-xs text-text-tertiary">or click to browse files</p>
                <p className="text-[10px] text-text-tertiary/60 mt-1">MP4, MOV, AVI up to 2GB</p>
              </div>
            )}
          </div>
          {errors.file && <p className="text-red-400 text-xs -mt-4">{errors.file}</p>}

          <Input label="Video Title" type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter a catchy title" error={errors.title} />
          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Describe your video to viewers" rows={3} />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Thumbnail</label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 cursor-pointer ${
                form.thumbnail ? 'border-state-success bg-state-success/5' : 'border-border-subtle hover:border-accent/50 hover:bg-tertiary'
              }`}
              onClick={() => thumbInputRef.current?.click()}
            >
              <input ref={thumbInputRef} type="file" name="thumbnail" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e.target.files, 'thumbnail')} />
              {form.thumbnail ? (
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-5 h-5 text-state-success" />
                  <span className="text-sm text-text-primary">{form.thumbnail.name}</span>
                </div>
              ) : (
                <p className="text-sm text-text-tertiary">Click to upload thumbnail image</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button fullWidth variant="secondary" onClick={() => setShowUploadModal(false)} type="button">Cancel</Button>
            <Button fullWidth type="submit">Publish</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
