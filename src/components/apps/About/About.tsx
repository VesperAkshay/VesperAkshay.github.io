import { useState } from 'react'
import { profile } from '../../../data/profile'
import {
  MapPin,
  Mail,
  FileText,
  Briefcase,
  Award,
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useWindowStore } from '../../../store/windowStore'

export const About = () => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0)
  const open = useWindowStore((state) => state.open)

  const currentTestimonial = profile.testimonials[activeTestimonialIdx]

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % profile.testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonialIdx(
      (prev) => (prev - 1 + profile.testimonials.length) % profile.testimonials.length
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-7 text-slate-800 dark:text-slate-100 flex flex-col gap-8">
      {/* Hero / Profile Header */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-black/10 dark:border-white/10">
        {/* Avatar with subtle glow */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/40 dark:border-white/20 shadow-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white">
            <img
              src="/profile.png"
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span className="hidden group-[.fallback]:inline">AP</span>
          </div>
          <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-white dark:border-[#1a1b20]" title="Open to new opportunities" />
        </div>

        {/* Bio & Intro */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {profile.name}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20">
              Staff Engineer
            </span>
          </div>

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
            {profile.role}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              {profile.email}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            {profile.bio}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <button
              onClick={() => open('contact')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </button>
            <button
              onClick={() => open('preview')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5 border border-black/5 dark:border-white/10"
            >
              <FileText className="w-3.5 h-3.5" />
              View Resume
            </button>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Technical Expertise & Craft
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {profile.skillCategories.map((cat) => (
            <div
              key={cat.name}
              className="p-4 rounded-xl bg-slate-100/70 dark:bg-[#202128]/70 border border-black/5 dark:border-white/10"
            >
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-2.5">
                {cat.name}
              </h3>
              <ul className="space-y-1.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-500" />
          Career Timeline
        </h2>

        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 pl-8">
          {profile.experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </span>
                  <span className="text-xs text-blue-500 font-medium">@ {exp.company}</span>
                  <span className="text-[11px] text-slate-400 font-mono">({exp.year})</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-black/5 dark:border-white/5"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Open Source */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-[#202128]/70 border border-black/5 dark:border-white/10">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Education
          </h3>
          <div className="space-y-2 text-xs">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="border-b border-black/5 dark:border-white/5 pb-2 last:border-0 last:pb-0">
                <div className="font-semibold text-slate-900 dark:text-white">{edu.degree}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{edu.institution}</div>
                <div className="text-[10px] text-blue-500 font-medium">{edu.year} • {edu.score}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-[#202128]/70 border border-black/5 dark:border-white/10">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Honors & Open Source
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {profile.achievements.map((ach, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* RULE: The white dot represents active testimonial, the blue dot represents inactive testimonial */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-500" />
            Endorsements & Testimonials
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-100/90 to-slate-200/50 dark:from-[#20222a] dark:to-[#171820] border border-black/5 dark:border-white/10 shadow-sm">
          <Quote className="w-8 h-8 text-blue-500/20 absolute top-4 right-4" />
          <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
              />
              <div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                  {currentTestimonial.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentTestimonial.role} • {currentTestimonial.company}
                </p>
              </div>
            </div>

            {/* Pagination Dots */}
            {/* The white dot represents active testimonial. The blue dot represents inactive testimonial */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/10 dark:bg-black/30 backdrop-blur-sm">
              {profile.testimonials.map((_, idx) => {
                const isActive = idx === activeTestimonialIdx
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonialIdx(idx)}
                    aria-label={`Testimonial ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                      isActive
                        ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] ring-1 ring-slate-400'
                        : 'bg-blue-500 opacity-90 hover:opacity-100'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
