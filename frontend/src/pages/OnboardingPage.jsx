import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Onboarding failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-[#0f172a] border border-[#334155] rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Image / Avatar Preview Section */}
          <div className="flex flex-col items-center justify-center p-8 bg-[#1e293b]">
            <div className="size-36 md:size-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-800">
                  <CameraIcon className="size-12 text-white opacity-40" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="mt-6 btn bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShuffleIcon className="size-4 mr-2" /> Generate Random Avatar
            </button>
          </div>

          {/* Right Form Section */}
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-white text-center">
              Complete Your Profile
            </h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="form-control">
                <label className="label text-white">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered bg-[#0f172a] text-white border-[#334155]"
                  placeholder="Your full name"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                />
              </div>

              {/* Bio */}
              <div className="form-control">
                <label className="label text-white">Bio</label>
                <textarea
                  className="textarea textarea-bordered bg-[#0f172a] text-white border-[#334155] h-24"
                  placeholder="Tell others about yourself"
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                ></textarea>
              </div>

              {/* Language Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-white">Native Language</label>
                  <select
                    className="select select-bordered bg-[#0f172a] text-white border-[#334155]"
                    value={formState.nativeLanguage}
                    onChange={(e) =>
                      setFormState({ ...formState, nativeLanguage: e.target.value })
                    }
                  >
                    <option value="">Select native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label text-white">Learning Language</label>
                  <select
                    className="select select-bordered bg-[#0f172a] text-white border-[#334155]"
                    value={formState.learningLanguage}
                    onChange={(e) =>
                      setFormState({ ...formState, learningLanguage: e.target.value })
                    }
                  >
                    <option value="">Select learning language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learn-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label text-white">Location</label>
                <div className="relative">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-white opacity-70" />
                  <input
                    type="text"
                    className="input input-bordered bg-[#0f172a] text-white border-[#334155] pl-10"
                    placeholder="City, Country"
                    value={formState.location}
                    onChange={(e) =>
                      setFormState({ ...formState, location: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4"
              >
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-5 mr-2" /> Complete Onboarding
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2" /> Onboarding...
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
