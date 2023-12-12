import React from 'react'
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AnnouncementIcon from '@mui/icons-material/Announcement';

export const SidebarData = [
    {
        title: "All task",
        icon: <ListAltIcon />,
        link: "all"
    },
    // {
    //     title: "Due tommorrow",
    //     icon: <AssignmentLateIcon />,
    //     link: "/duetommorrow"
    // },
    // {
    //     title: "Due this week",
    //     icon: <AssignmentReturnedIcon />,
    //     link: "/duethisweek"
    // },
    // {
    //     title: "Due this month",
    //     icon: <AssignmentIcon />,
    //     link: "/duethismonth"
    // },
    {
        title: "Completed",
        icon: <AssignmentTurnedInIcon />,
        link: "completed"
    },
    {
        title: "Incomplete",
        icon: <AnnouncementIcon />,
        link: "incomplete"
    }
]
