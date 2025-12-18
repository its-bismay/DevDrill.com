import { useMutation, useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionsApi } from "../api/sessions";


export const useCreateSession = () => {
    const result = useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionsApi.createSession,
        onSuccess: () => toast.success("session created successfully !"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to create room !")
    });

    return result;
}

export const useJoinSession = () => {
    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: sessionsApi.joinSession,
        onSuccess: () => toast.success("session joined successfully !"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to join the room !")
    });

    return result;
}

export const useEndSession = () => {
    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: sessionsApi.endSession,
        onSuccess: () => toast.success("session ended successfully !"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to close the room !")
    });

    return result;
}

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionsApi.getActiveSessions
    });

    return result;
}

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionsApi.getMyRecentSessions
    });

    return result;
}

export const useSessionById = (id) => {
    const result = useQuery({
        queryKey: ["sessionById", id],
        queryFn: () => sessionsApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000,
    });

    return result;
}


