import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Check } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, completeOnboarding, settings } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState(settings.creatorName);
  const [niche, setNiche] = useState(settings.niche);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    settings.platforms.slice(0, 3).map((p) => p.id)
  );
  const [weeklyTarget, setWeeklyTarget] = useState(settings.weeklyTargetPosts || 5);
  const [keepSampleData, setKeepSampleData] = useState(true);

  if (!showOnboarding) return null;

  const togglePlatform = (pId: string) => {
    if (selectedPlatforms.includes(pId)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== pId));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, pId]);
    }
  };

  const handleFinish = () => {
    completeOnboarding(name, niche, selectedPlatforms, weeklyTarget, keepSampleData);
  };

  const handleQuickSkip = () => {
    completeOnboarding(
      settings.creatorName,
      settings.niche,
      ['instagram', 'tiktok', 'youtube'],
      5,
      true
    );
  };

  return (
    <div
      id="onboarding-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1A]/40 transition-opacity"
    >
      <div
        id="onboarding-card"
        className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#232321] rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] p-5 space-y-4 transition-colors"
      >
        {/* Top Step Progress indicator */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]">
            Setup ({step} of 3)
          </span>

          <button
            type="button"
            onClick={handleQuickSkip}
            className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] focus-ring"
          >
            Skip setup
          </button>
        </div>

        {/* Step 1: Name & Niche */}
        {step === 1 && (
          <div className="space-y-3.5">
            <div>
              <h2 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
                Creator profile
              </h2>
              <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mt-0.5">
                Set your name and topic to personalize your workflow.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                  Name or handle
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3 py-1.5 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] text-xs focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
                />
              </div>

              <div>
                <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                  Topic or niche
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Architecture, Tech, Cooking"
                  className="w-full px-3 py-1.5 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] text-xs focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Platforms */}
        {step === 2 && (
          <div className="space-y-3.5">
            <div>
              <h2 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
                Active platforms
              </h2>
              <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mt-0.5">
                Choose the channels where you publish content.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {settings.platforms.map((p) => {
                const isSelected = selectedPlatforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`px-3 py-2 rounded-[4px] border text-left flex items-center justify-between text-xs transition-colors font-normal focus-ring ${
                      isSelected
                        ? 'border-[#2C6E56] dark:border-[#5AA88C] bg-[#EFECE6] dark:bg-[#2B2B28]'
                        : 'border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                    }`}
                  >
                    <span className="font-normal text-[#2A2925] dark:text-[#D9D7D1] capitalize">
                      {p.name}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#2C6E56] dark:text-[#5AA88C] stroke-[2]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Goals & Sample Data */}
        {step === 3 && (
          <div className="space-y-3.5">
            <div>
              <h2 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
                Weekly target
              </h2>
              <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mt-0.5">
                Target number of publications per week.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between p-3 rounded-[4px] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230]">
                <div>
                  <span className="text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] block">
                    Weekly posts
                  </span>
                  <p className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] font-normal">
                    Used to track consistency
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[3, 4, 5, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setWeeklyTarget(num)}
                      className={`w-7 h-7 rounded-[4px] font-normal text-xs transition-colors focus-ring ${
                        weeklyTarget === num
                          ? 'bg-[#EFECE6] text-[#2A2925] dark:bg-[#2B2B28] dark:text-[#D9D7D1] border border-[#2C6E56] dark:border-[#5AA88C]'
                          : 'bg-[#FFFFFF] dark:bg-[#232321] text-[#6F6C66] dark:text-[#9A978F] border border-[#E9E7E2] dark:border-[#323230]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-[4px] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230]">
                <div>
                  <span className="text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] block">
                    Sample content
                  </span>
                  <p className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] font-normal">
                    Load sample posts to explore the app
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={keepSampleData}
                  onChange={(e) => setKeepSampleData(e.target.checked)}
                  className="rounded-[3px] accent-[#2C6E56]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E9E7E2] dark:border-[#323230]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-xs font-normal px-2.5 h-7 rounded-[4px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-colors focus-ring"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1 px-3 h-7 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-1 px-3 h-7 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
            >
              <span>Get started</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
