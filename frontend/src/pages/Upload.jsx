import { Upload as UploadIcon, Video } from 'lucide-react'
import { Button } from '../components'
import { useUpload } from '../hooks/useUpload'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { UploadForm } from '../components/upload/UploadForm'
import { VisibilitySettings } from '../components/upload/VisibilitySettings'
import { MediaUploadDropzones } from '../components/upload/MediaUploadDropzones'

export const Upload = () => {
  useDocumentTitle('Upload Video')
  const {
    authLoading,
    formData,
    errors,
    handleChange,
    handleFileChange,
    togglePublish,
    handleSubmit
  } = useUpload()

  if (authLoading) return null

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-20" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <UploadIcon className="w-5 h-5 text-accent-active-text" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">Upload Video</h1>
            </div>
            <p className="text-text-secondary max-w-2xl ml-[3.25rem]">Share your content with the world. Fill in the details and publish.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <UploadForm formData={formData} errors={errors} handleChange={handleChange} />
            <VisibilitySettings formData={formData} togglePublish={togglePublish} />
          </div>

          <div className="space-y-6">
            <MediaUploadDropzones formData={formData} errors={errors} handleFileChange={handleFileChange} />

            <Button
              fullWidth
              type="submit"
              size="lg"
              className="bg-accent! text-accent-on-dark! hover:bg-accent-light! hover:text-accent-on-light! rounded-xl! py-3.5! font-semibold! tracking-wide! shadow-lg! transition-all"
              style={{ boxShadow: '0 0 24px var(--color-accent-glow-light)' }}
            >
              <Video className="w-4 h-4" />
              Publish Video
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}