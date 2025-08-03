import { useState, useEffect } from 'react'
import axios from 'axios'
import { Trash2, Upload, Download } from 'lucide-react'

export default function PatternManager() {
  const [patterns, setPatterns] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchPatterns()
  }, [])

  const fetchPatterns = async () => {
    try {
      const res = await axios.get('https://packages-server-75ra.onrender.com/api/patterns')
      if (Array.isArray(res.data.files)) {
        setPatterns(res.data.files)
      } else {
        console.error('Неверный формат данных:', res.data)
      }
    } catch (err) {
      console.error('Ошибка при загрузке шаблонов', err)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('pattern', file)

    setUploading(true)
    try {
      await axios.post('https://packages-server-75ra.onrender.com/api/patterns/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      fetchPatterns()
    } catch (err) {
      console.error('Ошибка при загрузке файла', err)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`https://packages-server-75ra.onrender.com/api/patterns/${filename}`)
      fetchPatterns()
    } catch (err) {
      console.error('Ошибка при удалении файла', err)
    }
  }

  const handleDownload = (filename) => {
    // Прямой переход по ссылке на серверный endpoint загрузки
    const link = document.createElement('a')
    link.href = `https://packages-server-75ra.onrender.com/api/patterns/download/${encodeURIComponent(filename)}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Управление шаблонами цен (patterns)</h2>

      <div className="flex items-center mb-4 gap-4">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="block"
        />
        <button
          disabled={uploading}
          className={`flex items-center gap-2 px-4 py-2 rounded text-white font-semibold transition ${
            uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Upload size={18} />
          Загрузить
        </button>
      </div>

      <ul className="space-y-2">
        {patterns.map((file) => (
          <li
            key={file}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
          >
            <span className="truncate">{file}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload(file)}
                className="flex items-center gap-1 px-3 py-1 rounded text-sm bg-green-600 hover:bg-green-700 text-white transition"
              >
                <Download size={16} />
                Скачать
              </button>
              <button
                onClick={() => handleDelete(file)}
                className="flex items-center gap-1 px-3 py-1 rounded text-sm bg-red-600 hover:bg-red-700 text-white transition"
              >
                <Trash2 size={16} />
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
