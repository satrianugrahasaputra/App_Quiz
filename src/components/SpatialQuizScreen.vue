<template>
  <div class="space-y-6 max-w-xl mx-auto animate-fade-in">
    <!-- Config screen (before playing) -->
    <div v-if="!gameStarted && !gameFinished" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 space-y-6">
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-650 dark:bg-violet-500/20 dark:text-violet-400">
          <span class="text-3xl">📐</span>
        </div>
        <h2 class="text-2xl font-black text-slate-800 dark:text-white">Kuis Spasial</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Uji visualisasi spasial Anda: hitung tumpukan kubus 3D, analisis rotasi geometri, pencerminan, dan lipatan jaring-jaring bangun ruang.
        </p>
      </div>

      <!-- Difficulty Selector -->
      <div class="space-y-3 pt-2">
        <label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block text-center">
          Pilih Tingkat Kesulitan
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="lvl in ['easy', 'medium', 'hard']"
            :key="lvl"
            @click="difficulty = lvl"
            type="button"
            :class="[
              'py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 capitalize',
              difficulty === lvl
                ? lvl === 'easy'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                  : lvl === 'medium'
                  ? 'bg-violet-50/50 dark:bg-violet-950/20 border-violet-550 text-violet-755 dark:text-violet-400 ring-2 ring-violet-500/20'
                  : 'bg-slate-900 text-white border-slate-900 dark:bg-slate-700 dark:border-slate-600 ring-2 ring-slate-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            {{ lvl === 'easy' ? '🟢 Mudah' : lvl === 'medium' ? '🟡 Sedang' : '🔴 Sulit' }}
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3 pt-2">
        <button
          @click="emit('home')"
          class="flex-1 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-655 text-slate-700 dark:text-white font-bold rounded-2xl transition-all duration-300"
        >
          Kembali
        </button>
        <button
          @click="startGame"
          class="flex-[2] py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-violet-500/20 transition-all duration-300"
        >
          Mulai Latihan
        </button>
      </div>
    </div>

    <!-- Active play screen -->
    <div v-else-if="gameStarted && !gameFinished" class="space-y-6">
      
      <!-- Stats Header -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-5 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-xl">🎯</span>
          <span class="font-bold text-slate-800 dark:text-white">Skor: {{ score }}</span>
        </div>
        <div class="font-bold text-slate-500 dark:text-slate-400">
          Soal {{ currentIdx + 1 }} dari {{ questions.length }}
        </div>
      </div>

      <!-- Question Text Panel -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-6 text-center space-y-2">
        <span class="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">KUIS SPASIAL SOAL {{ currentIdx + 1 }}</span>
        <h3 class="text-base md:text-lg font-bold text-slate-800 dark:text-white leading-relaxed">
          {{ activeQuestion.text }}
        </h3>
      </div>

      <!-- High-Fidelity SVG Illustrations -->
      <div class="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xl p-8 flex flex-col items-center justify-center min-h-[300px] overflow-visible">
        
        <!-- 1. Cube Stack 4 (Easy 1) -->
        <svg v-if="activeQuestion.svgType === 'cube-stack-4'" width="220" height="200" viewBox="0 0 220 200" class="overflow-visible">
          <!-- Coordinates: Base of 3 cubes, 1 cube on top -->
          <!-- x=0, y=1 ground -->
          <g transform="translate(60, 110)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- x=1, y=0 ground -->
          <g transform="translate(120, 80)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- x=0, y=0 ground -->
          <g transform="translate(90, 95)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- x=0, y=0 Level 1 (top) -->
          <g transform="translate(90, 60)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#818cf8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4f46e5" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c7d2fe" stroke="#1e293b" stroke-width="1.5"/>
          </g>
        </svg>

        <!-- 2. Cube Stairs 3 (Easy 3) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-stairs-3'" width="220" height="200" viewBox="0 0 220 200">
          <!-- Step 1: ground x=1, y=0 -->
          <g transform="translate(120, 110)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- Step 2: ground x=0, y=0 -->
          <g transform="translate(90, 125)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- Step 3: level 1 x=0, y=0 -->
          <g transform="translate(90, 90)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#fb7185" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#e11d48" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#fecdd3" stroke="#1e293b" stroke-width="1.5"/>
          </g>
        </svg>

        <!-- 3. L-Shape Rotation comparative (Easy 2) -->
        <div v-else-if="activeQuestion.svgType === 'rotation-l-shape'" class="flex flex-col items-center space-y-4 w-full">
          <div class="flex items-center space-x-8">
            <!-- Source Shape -->
            <div class="flex flex-col items-center">
              <svg width="80" height="90" viewBox="0 0 80 90">
                <path d="M 15 10 L 35 10 L 35 60 L 65 60 L 65 80 L 15 80 Z" fill="#3b82f6" stroke="#1e293b" stroke-width="2"/>
              </svg>
              <span class="text-xs font-bold text-slate-500 mt-1">Bentuk Asli</span>
            </div>
            
            <div class="text-2xl text-slate-400 font-bold">➡️</div>
            
            <!-- Options A & B -->
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="70" height="70" viewBox="0 0 80 80">
                  <!-- Option A: Mirrored / Wrong -->
                  <path d="M 65 10 L 45 10 L 45 60 L 15 60 L 15 80 L 65 80 Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
                </svg>
                <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan A</span>
              </div>
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="70" height="70" viewBox="0 0 80 80">
                  <!-- Option B: Correct Rotated 90° Clockwise -->
                  <!-- H-bar top: L-leg extending left -->
                  <path d="M 10 30 L 70 30 L 70 50 L 30 50 L 30 70 L 10 70 Z" fill="#64748b" stroke="#334155" stroke-width="1.5" transform="rotate(0)"/>
                </svg>
                <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan B</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
              <svg width="70" height="70" viewBox="0 0 80 80">
                <!-- Option C: Altered Shape -->
                <path d="M 15 10 L 55 10 L 55 50 L 65 50 L 65 80 L 15 80 Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
              </svg>
              <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan C</span>
            </div>
            <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
              <svg width="70" height="70" viewBox="0 0 80 80">
                <!-- Option D: Wrong rotation -->
                <path d="M 15 10 L 65 10 L 65 30 L 35 30 L 35 80 L 15 80 Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
              </svg>
              <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan D</span>
            </div>
          </div>
        </div>

        <!-- 4. Cube Stack 8 (Medium 1) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-stack-8'" width="220" height="220" viewBox="0 0 220 220" class="overflow-visible">
          <!-- Dashed floor grid to show base footprint -->
          <g stroke="#94a3b8" stroke-dasharray="2" stroke-width="1.2" fill="none" opacity="0.6">
            <!-- Ground footprint cells -->
            <polygon points="110,180 140,165 110,150 80,165" />
            <polygon points="140,165 170,150 140,135 110,150" />
            <polygon points="80,165 110,150 80,135 50,150" />
            <polygon points="110,150 140,135 110,120 80,135" />
            <polygon points="140,135 170,120 140,105 110,120" />
            <polygon points="50,150 80,135 50,120 20,135" />
            <polygon points="80,135 110,120 80,105 50,120" />
          </g>

          <!-- Dashed/Semi-transparent hidden support cubes -->
          <!-- Hidden support cube at ground level x=1, y=0 -->
          <g transform="translate(140, 130)" opacity="0.35" stroke-dasharray="3">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#cbd5e1" stroke="#1e293b" stroke-width="1"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#cbd5e1" stroke="#1e293b" stroke-width="1"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1"/>
          </g>
          <!-- Hidden support cube at ground level x=0, y=1 -->
          <g transform="translate(80, 130)" opacity="0.35" stroke-dasharray="3">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#cbd5e1" stroke="#1e293b" stroke-width="1"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#cbd5e1" stroke="#1e293b" stroke-width="1"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1"/>
          </g>

          <!-- Visible cubes (from back to front) -->
          <!-- x=0, y=2 -->
          <g transform="translate(50, 130)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- x=2, y=0 -->
          <g transform="translate(140, 100)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- x=1, y=1 -->
          <g transform="translate(110, 115)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- x=0, y=0 -->
          <g transform="translate(110, 135)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- Level 1 (2 cubes) -->
          <g transform="translate(110, 100)"><!-- L1 x=0, y=0 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#38bdf8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#0284c7" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#bae6fd" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <g transform="translate(80, 115)"><!-- L1 x=1, y=0 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#38bdf8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#0284c7" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#bae6fd" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <!-- Level 2 (1 top cube) -->
          <g transform="translate(110, 65)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#facc15" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#ca8a04" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#fef08a" stroke="#1e293b" stroke-width="1.5"/>
          </g>
        </svg>

        <!-- 5. Cube Net Fold 1 (Medium 2) -->
        <div v-else-if="activeQuestion.svgType === 'cube-net-fold-1'" class="flex flex-col items-center space-y-6 w-full">
          <div class="flex flex-col md:flex-row items-center justify-around w-full gap-6">
            <!-- Unfolded Net -->
            <div class="flex flex-col items-center">
              <svg width="150" height="150" viewBox="0 0 120 150">
                <g transform="translate(15, 15)" stroke="#1e293b" stroke-width="1.5">
                  <rect x="30" y="0" width="30" height="30" fill="#ef4444"/> <!-- Red -->
                  <rect x="30" y="30" width="30" height="30" fill="#3b82f6"/> <!-- Blue -->
                  <rect x="30" y="60" width="30" height="30" fill="#10b981"/> <!-- Green -->
                  <rect x="30" y="90" width="30" height="30" fill="#f59e0b"/> <!-- Orange -->
                  <rect x="0" y="30" width="30" height="30" fill="#8b5cf6"/> <!-- Violet -->
                  <rect x="60" y="30" width="30" height="30" fill="#ec4899"/> <!-- Pink -->
                </g>
              </svg>
              <span class="text-xs font-bold text-slate-500 mt-1">Jaring-Jaring</span>
            </div>

            <!-- 3D Folded Cube Options Comparative Grid -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Pola A (Correct: Violet, Red, Blue) -->
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <g transform="translate(15, 20)">
                    <polygon points="0,0 15,-8 30,0 15,8" fill="#ef4444" stroke="#1e293b"/> <!-- Red Top -->
                    <polygon points="0,0 0,20 15,28 15,8" fill="#8b5cf6" stroke="#1e293b"/> <!-- Violet Left -->
                    <polygon points="15,8 15,28 30,20 30,0" fill="#3b82f6" stroke="#1e293b"/> <!-- Blue Right -->
                  </g>
                </svg>
                <span class="text-[10px] font-black text-slate-500">Pola A</span>
              </div>
              
              <!-- Pola B (Incorrect: Red + Green opposites adjacent) -->
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <g transform="translate(15, 20)">
                    <polygon points="0,0 15,-8 30,0 15,8" fill="#ef4444" stroke="#1e293b"/> <!-- Red Top -->
                    <polygon points="0,0 0,20 15,28 15,8" fill="#10b981" stroke="#1e293b"/> <!-- Green Left -->
                    <polygon points="15,8 15,28 30,20 30,0" fill="#3b82f6" stroke="#1e293b"/> <!-- Blue Right -->
                  </g>
                </svg>
                <span class="text-[10px] font-black text-slate-500">Pola B</span>
              </div>
              
              <!-- Pola C (Incorrect: Violet + Pink opposites adjacent) -->
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <g transform="translate(15, 20)">
                    <polygon points="0,0 15,-8 30,0 15,8" fill="#8b5cf6" stroke="#1e293b"/> <!-- Violet Top -->
                    <polygon points="0,0 0,20 15,28 15,8" fill="#ec4899" stroke="#1e293b"/> <!-- Pink Left -->
                    <polygon points="15,8 15,28 30,20 30,0" fill="#3b82f6" stroke="#1e293b"/> <!-- Blue Right -->
                  </g>
                </svg>
                <span class="text-[10px] font-black text-slate-500">Pola C</span>
              </div>
              
              <!-- Pola D (Incorrect: Orange + Blue opposites adjacent) -->
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <g transform="translate(15, 20)">
                    <polygon points="0,0 15,-8 30,0 15,8" fill="#f59e0b" stroke="#1e293b"/> <!-- Orange Top -->
                    <polygon points="0,0 0,20 15,28 15,8" fill="#3b82f6" stroke="#1e293b"/> <!-- Blue Left -->
                    <polygon points="15,8 15,28 30,20 30,0" fill="#10b981" stroke="#1e293b"/> <!-- Green Right -->
                  </g>
                </svg>
                <span class="text-[10px] font-black text-slate-500">Pola D</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Arrow Reflection horizontal (Medium 3) -->
        <div v-else-if="activeQuestion.svgType === 'arrow-reflection'" class="flex flex-col items-center space-y-4 w-full">
          <div class="flex items-center space-x-6">
            <div class="flex flex-col items-center">
              <svg width="80" height="70" viewBox="0 0 80 70">
                <path d="M 5 20 L 45 20 L 45 5 L 75 35 L 45 65 L 45 50 L 5 50 Z" fill="#2563eb" stroke="#1e293b" stroke-width="2"/>
              </svg>
              <span class="text-xs font-bold text-slate-500 mt-1">Asli</span>
            </div>
            <div class="text-2xl text-slate-400 font-bold">➡️</div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="70" height="60" viewBox="0 0 80 70">
                  <!-- Option A: Pointing down -->
                  <path d="M 20 5 L 20 45 L 5 45 L 35 75 L 65 45 L 50 45 L 50 5 Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
                </svg>
                <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan A</span>
              </div>
              <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
                <svg width="70" height="60" viewBox="0 0 80 70">
                  <!-- Option B: Mirror wrong -->
                  <path d="M 5 20 L 45 20 L 45 5 L 75 35 L 45 65 L 45 50 L 5 50 Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
                </svg>
                <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan B</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
              <svg width="70" height="60" viewBox="0 0 80 70">
                <!-- Option C: True Reflection pointing left -->
                <path d="M 75 20 L 35 20 L 35 5 L 5 35 L 35 65 L 35 50 L 75 50 Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
              </svg>
              <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan C</span>
            </div>
            <div class="flex flex-col items-center border border-slate-100 dark:border-slate-800 p-2 rounded-xl">
              <svg width="70" height="60" viewBox="0 0 80 70">
                <!-- Option D: Altered width -->
                <path d="M 15 20 L 35 20 L 35 5 L 75 35 L 35 65 L 35 50 L 15 50 Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
              </svg>
              <span class="text-xs font-black text-slate-600 dark:text-slate-400">Pilihan D</span>
            </div>
          </div>
        </div>
        <!-- 7. Cube Pyramid 14 (Hard 1) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-pyramid-14'" width="220" height="220" viewBox="0 0 220 220" class="overflow-visible">
          <!-- Footprint Grid -->
          <g stroke="#94a3b8" stroke-dasharray="2" stroke-width="1.2" fill="none" opacity="0.6">
            <polygon points="120,185 150,170 120,155 90,170"/>
            <polygon points="150,170 180,155 150,140 120,155"/>
            <polygon points="90,170 120,155 90,140 60,155"/>
            <polygon points="120,155 150,140 120,125 90,140"/>
            <polygon points="150,140 180,125 150,110 120,125"/>
            <polygon points="60,155 90,140 60,125 30,140"/>
            <polygon points="90,140 120,125 90,110 60,125"/>
          </g>

          <!-- Dashed hidden support cubes -->
          <!-- Center support cube ground level (1,1) -->
          <g transform="translate(90, 140)" opacity="0.3" stroke-dasharray="2.5">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#cbd5e1" stroke="#1e293b"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#cbd5e1" stroke="#1e293b"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#cbd5e1" stroke="#1e293b"/>
          </g>
          <!-- Center support cube Level 1 -->
          <g transform="translate(90, 105)" opacity="0.35" stroke-dasharray="2.5">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#cbd5e1" stroke="#1e293b"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#cbd5e1" stroke="#1e293b"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#cbd5e1" stroke="#1e293b"/>
          </g>

          <!-- Visible cubes (base, mid, top) -->
          <g transform="translate(60, 150)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <g transform="translate(120, 150)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <g transform="translate(90, 120)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#6366f1" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#4f46e5" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#c7d2fe" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <g transform="translate(60, 105)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#6366f1" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#4f46e5" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#c7d2fe" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <g transform="translate(90, 75)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#f43f5e" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#be123c" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#fecdd3" stroke="#1e293b" stroke-width="1.5"/>
          </g>
        </svg>

        <!-- 8. Prism Folding net (Hard 2) -->
        <div v-else-if="activeQuestion.svgType === 'prism-fold-hard'" class="flex flex-col items-center space-y-4">
          <svg width="220" height="150" viewBox="0 0 220 150">
            <!-- Prism Unfolded Net -->
            <g stroke="#1e293b" stroke-width="1.5">
              <!-- Central Rectangle (Orange) -->
              <rect x="75" y="45" width="50" height="60" fill="#f97316"/>
              <text x="80" y="80" font-size="9" font-weight="bold" fill="#fff" stroke="none">ORANYE</text>
              
              <!-- Left Rectangle (Yellow) -->
              <rect x="25" y="45" width="50" height="60" fill="#eab308"/>
              <text x="32" y="80" font-size="9" font-weight="bold" fill="#fff" stroke="none">KUNING</text>
              
              <!-- Right Rectangle (Green) -->
              <rect x="125" y="45" width="50" height="60" fill="#22c55e"/>
              <text x="133" y="80" font-size="9" font-weight="bold" fill="#fff" stroke="none">HIJAU</text>
              
              <!-- Top Triangle (Red) -->
              <polygon points="75,45 125,45 100,10" fill="#ef4444"/>
              <text x="90" y="35" font-size="9" font-weight="bold" fill="#fff" stroke="none">MERAH</text>
              
              <!-- Bottom Triangle (Blue) -->
              <polygon points="75,105 125,105 100,140" fill="#3b82f6"/>
              <text x="92" y="125" font-size="9" font-weight="bold" fill="#fff" stroke="none">BIRU</text>
            </g>
          </svg>
        </div>        <!-- 9. Cube Stack Donut 12 (Hard 3) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-stack-donut-12'" width="220" height="220" viewBox="0 0 220 220" class="overflow-visible">
          <!-- Footprint Grid with hollow center -->
          <g stroke="#94a3b8" stroke-dasharray="2" stroke-width="1.2" fill="none" opacity="0.6">
            <polygon points="120,175 150,160 120,145 90,160"/>
            <polygon points="150,160 180,145 150,130 120,145"/>
            <polygon points="90,160 120,145 90,130 60,145"/>
            <polygon points="60,145 90,130 60,115 30,130"/>
            <polygon points="120,145 150,130 120,115 90,130"/>
            <polygon points="150,130 180,115 150,100 120,115"/>
          </g>

          <!-- Dashed hidden support cubes -->
          <!-- Ground layer hollow center supports (underneath Level 1 cubes) -->
          <g transform="translate(90, 130)" opacity="0.3" stroke-dasharray="2.5">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#cbd5e1" stroke="#1e293b"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#cbd5e1" stroke="#1e293b"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#cbd5e1" stroke="#1e293b"/>
          </g>

          <!-- Base layer: outer boundary cubes -->
          <g transform="translate(60, 140)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <g transform="translate(120, 140)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          
          <!-- Level 1 donut layer (4 cubes) -->
          <g transform="translate(90, 110)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a855f7" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#7e22ce" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#e9d5ff" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <g transform="translate(60, 95)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a855f7" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="0,0 0,30 30,45 30,15" fill="#7e22ce" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="30,15 30,45 60,30 60,0" fill="#e9d5ff" stroke="#1e293b" stroke-width="1.5"/>
          </g>
        </svg>


      </div>

      <!-- Multiple Choice Options -->
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="(option, idx) in activeQuestion.options"
          :key="idx"
          @click="selectAnswer(option)"
          :disabled="selectedAnswer !== null"
          :class="[
            'relative p-5 text-lg font-bold rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 select-none text-center font-mono',
            getButtonClass(option)
          ]"
        >
          {{ option.value }}
        </button>
      </div>

      <!-- Next question navigator -->
      <div class="h-16 flex items-center justify-center">
        <button
          v-if="selectedAnswer !== null"
          @click="nextQuestion"
          class="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-md hover:bg-slate-900 dark:hover:bg-slate-655 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>{{ currentIdx < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil' }}</span>
          <span>→</span>
        </button>
      </div>

    </div>

    <!-- Final Result screen -->
    <div v-else class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 text-center space-y-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-500/10 text-violet-650 dark:bg-violet-500/20 dark:text-violet-400 text-4xl shadow-inner">
        🏆
      </div>
      
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 dark:text-white">Latihan Selesai!</h2>
        <p class="text-lg font-bold text-violet-600 dark:text-violet-455 uppercase tracking-widest">
          Kuis Spasial
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Skor Akhir</p>
          <p class="text-3xl font-black text-violet-600 dark:text-violet-400 mt-1 font-mono">
            {{ score }} <span class="text-lg font-normal text-slate-400">/ {{ questions.length }}</span>
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Akurasi</p>
          <p class="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 font-mono">
            {{ Math.round((score / questions.length) * 100) }}%
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center pt-4">
        <button
          @click="startGame"
          class="flex-1 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
        >
          Ulangi Latihan
        </button>
        <button
          @click="emit('home')"
          class="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-655 text-slate-700 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-700 transition-all duration-300"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSpatialGenerator } from '../composables/useSpatialGenerator.js';
import { playBeep } from '../composables/useQuiz.js';

const emit = defineEmits(['home']);
const { getSpatialQuestions } = useSpatialGenerator();

const difficulty = ref('medium');
const gameStarted = ref(false);
const gameFinished = ref(false);
const questions = ref([]);
const currentIdx = ref(0);
const activeQuestion = ref(null);
const selectedAnswer = ref(null);
const score = ref(0);

const startGame = () => {
  playBeep('click');
  questions.value = getSpatialQuestions(difficulty.value);
  currentIdx.value = 0;
  score.value = 0;
  gameFinished.value = false;
  gameStarted.value = true;
  loadQuestion();
};

const loadQuestion = () => {
  selectedAnswer.value = null;
  activeQuestion.value = questions.value[currentIdx.value];
};

const selectAnswer = (option) => {
  if (selectedAnswer.value !== null) return;
  selectedAnswer.value = option;
  
  if (option.correct) {
    score.value++;
    playBeep('correct');
  } else {
    playBeep('wrong');
  }
};

const nextQuestion = () => {
  playBeep('click');
  if (currentIdx.value < questions.value.length - 1) {
    currentIdx.value++;
    loadQuestion();
  } else {
    gameFinished.value = true;
  }
};

const getButtonClass = (option) => {
  const isAnswered = selectedAnswer.value !== null;
  const isSelected = selectedAnswer.value?.value === option.value;
  
  if (!isAnswered) {
    return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:border-violet-500 hover:bg-violet-50/20 dark:hover:bg-slate-750 hover:scale-[1.02] active:scale-[0.98]';
  }
  if (option.correct) {
    return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400 border-2';
  }
  if (isSelected && !option.correct) {
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-455 border-2';
  }
  return 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
};
</script>
