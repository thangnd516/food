"use client";

import VerticalTabs from "@/components/dashboard/user/VerticalTabs";

import ChangePassword from "@/components/dashboard/user/password/ChangePassword";

export default function ChangePasswordPage() {
    return (
        <VerticalTabs>
            <ChangePassword />
        </VerticalTabs>
    );
}