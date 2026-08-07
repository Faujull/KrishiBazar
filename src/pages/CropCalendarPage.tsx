import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_CALENDAR_TASKS, INITIAL_CROPS } from '../data/mockData';
import { CropCalendarTask } from '../types';
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Plus,
  Droplets,
  Sprout,
  FlaskConical,
  Bug,
  Shovel,
  X
} from 'lucide-react';

export const CropCalendarPage: React.FC = () => {
  const { language, t } = useLanguage();

  const [selectedCropId, setSelectedCropId] = useState(INITIAL_CROPS[0].id);
  const [tasks, setTasks] = useState<CropCalendarTask[]>(INITIAL_CALENDAR_TASKS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<CropCalendarTask['category']>('fertilizer');
  const [newTaskDate, setNewTaskDate] = useState('২০২৬-০৮-১৫');

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const created: CropCalendarTask = {
      id: Date.now().toString(),
      cropId: selectedCropId,
      cropNameBn: 'উফশী আমন ধান',
      cropNameEn: 'Amon Rice',
      dayNumber: 30,
      weekNumber: 5,
      titleBn: newTaskTitle,
      titleEn: newTaskTitle,
      descriptionBn: newTaskDesc || 'কৃষক কর্তৃক ম্যানুয়ালি যুক্ত পরিচর্যা কাজ',
      descriptionEn: newTaskDesc || 'Custom farmer care task',
      category: newTaskCategory,
      completed: false,
      dueDate: newTaskDate,
    };

    setTasks((prev) => [created, ...prev]);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsModalOpen(false);
  };

  const activeCrop = INITIAL_CROPS.find((c) => c.id === selectedCropId) || INITIAL_CROPS[0];
  const filteredTasks = tasks.filter(
    (task) =>
      task.cropId === selectedCropId &&
      (filterCategory === 'all' || task.category === filterCategory)
  );

  const getCategoryIcon = (category: CropCalendarTask['category']) => {
    switch (category) {
      case 'watering':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'fertilizer':
        return <FlaskConical className="w-4 h-4 text-emerald-600" />;
      case 'pest_control':
        return <Bug className="w-4 h-4 text-amber-600" />;
      case 'soil_prep':
        return <Shovel className="w-4 h-4 text-orange-600" />;
      case 'harvesting':
      default:
        return <Sprout className="w-4 h-4 text-[#2E7D32]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Header Banner */}
      <div className="bg-[#2E7D32] text-white p-4 rounded-2xl shadow-md space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-[#F9A825]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">{t('cropCalendarTitle')}</h2>
              <p className="text-[11px] text-green-100">{t('cropCalendarSub')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Select Active Crop Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
        <label className="text-xs font-bold text-gray-700 block">
          {t('selectActiveCrop')}
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {INITIAL_CROPS.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCropId(crop.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCropId === crop.id
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {language === 'bn' ? crop.cropNameBn : crop.cropNameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Chips & Add Task Button */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-1.5 text-xs font-medium">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterCategory === 'all'
                ? 'bg-gray-900 text-white font-bold'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {t('allTasks')}
          </button>
          <button
            onClick={() => setFilterCategory('fertilizer')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterCategory === 'fertilizer'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            🧪 {language === 'bn' ? 'সার' : 'Fertilizer'}
          </button>
          <button
            onClick={() => setFilterCategory('pest_control')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterCategory === 'pest_control'
                ? 'bg-amber-700 text-white font-bold'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            🐛 {language === 'bn' ? 'বালাইনাশক' : 'Pesticide'}
          </button>
          <button
            onClick={() => setFilterCategory('watering')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterCategory === 'watering'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            💧 {language === 'bn' ? 'সেচ' : 'Watering'}
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2E7D32] text-white p-2 rounded-full shadow-md active:scale-95 transition-transform shrink-0"
          title={t('addTask')}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task Cards Timeline List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-xs text-gray-500 space-y-2">
            <CalendarDays className="w-8 h-8 text-gray-300 mx-auto" />
            <p>{language === 'bn' ? 'এই বিভাগের কোনো পরিচর্যা নির্ধারিত নেই।' : 'No tasks scheduled in this category.'}</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white p-4 rounded-2xl border transition-all shadow-xs ${
                task.completed
                  ? 'border-gray-200 bg-gray-50/70 opacity-80'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mt-0.5 shrink-0 active:scale-90 transition-transform"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-[#2E7D32]" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 hover:text-[#2E7D32]" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-green-100 text-[#2E7D32] px-2 py-0.5 rounded-md flex items-center gap-1">
                      {getCategoryIcon(task.category)}
                      <span>
                        {language === 'bn' ? `সপ্তাহ ${task.weekNumber}` : `Week ${task.weekNumber}`}
                      </span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {task.dueDate}
                    </span>
                  </div>

                  <h4
                    className={`text-xs font-bold leading-snug ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {language === 'bn' ? task.titleBn : task.titleEn}
                  </h4>

                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {language === 'bn' ? task.descriptionBn : task.descriptionEn}
                  </p>

                  {/* Weather Warning inside Task Card */}
                  {task.weatherWarningBn && !task.completed && (
                    <div className="bg-amber-50 p-2 rounded-xl border border-amber-200 text-[10px] text-amber-900 flex items-center gap-1.5 mt-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{language === 'bn' ? task.weatherWarningBn : task.weatherWarningEn}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Custom Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#2E7D32]" />
                <span>{t('addTask')}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">পরিচর্যার শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="যেমন: দ্বিতীয় কিস্তি পটাশ প্রয়োগ"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">বিভাগ *</label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                >
                  <option value="fertilizer">সার প্রয়োগ (Fertilizer)</option>
                  <option value="pest_control">বালাইনাশক স্প্রে (Pesticide)</option>
                  <option value="watering">সেচ দেওয়া (Watering)</option>
                  <option value="soil_prep">মাটি বা আগাছা দমন (Soil Prep)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">তারিখ *</label>
                <input
                  type="date"
                  required
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">বিবরণ (ঐচ্ছিক)</label>
                <textarea
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="সারের মাত্রা বা বিশেষ নির্দেশিকা..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] h-16"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2E7D32] text-white font-bold py-3 rounded-xl shadow-md active:scale-98 transition-all"
              >
                {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
