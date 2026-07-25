import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'
import { Skeleton, Button } from '../components'
import { useEditVideo } from '../hooks/useEditVideo'
import { EditVideoForm } from '../components/video/EditVideoForm'
import { ThumbnailUploader } from '../components/video/ThumbnailUploader'
import { VisibilitySettings } from '../components/upload/VisibilitySettings'
import { useParams } from 'react-router-dom'

const EditVideo = () => {
  const { videoId } = useParams()
  const {
    authLoading, loading, submitting, formData,
    thumbnailPreview, errors, handleChange,
    handleFileChange, togglePublish, handleSubmit, navigate
  } = useEditVideo(videoId)

  const handleTogglePublish = (val) => {
    if (formData.isPublished !== val) togglePublish()
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-start justify-center pt-16 px-4">
        <div className="w-full max-w-5xl space-y-6">
          <Skeleton className="h-8 w-1/3 !rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl space-y-5" style={{ background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)', border: '1px solid var(--color-border-light)' }}>
                <Skeleton className="h-12 w-full !rounded-lg" />
                <Skeleton className="h-32 w-full !rounded-lg" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)', border: '1px solid var(--color-border-light)' }}>
                <Skeleton className="h-40 w-full !rounded-xl" />
              </div>
              <Skeleton className="h-12 w-full !rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-screen"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-20" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <button
          onClick={() => navigate(`/video/${videoId}`)}
          className="flex items-center gap-2 text-text-secondary hover:text-accent-light transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Video
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Save className="w-5 h-5 text-accent-light" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">Edit Video</h1>
            <p className="text-text-secondary max-w-2xl">Update your video details and visibility settings.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <EditVideoForm formData={formData} errors={errors} handleChange={handleChange} />
            <VisibilitySettings formData={formData} togglePublish={handleTogglePublish} />
          </div>

          <div className="space-y-6">
            <ThumbnailUploader thumbnailPreview={thumbnailPreview} onFileChange={handleFileChange} submitting={submitting} />

            <Button
              fullWidth
              type="submit"
              size="lg"
              loading={submitting}
              className="!bg-accent !text-accent-on-dark hover:!bg-accent-light hover:!text-accent-on-light !rounded-xl !py-3.5 !font-semibold !tracking-wide !shadow-lg transition-all"
              style={{ boxShadow: '0 0 24px var(--color-accent-glow-light)' }}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default EditVideo