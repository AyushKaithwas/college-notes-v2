import * as React from 'react';

declare function Card({ className, title, children, href, }: {
    className?: string;
    title: string;
    children: React.ReactNode;
    href: string;
}): JSX.Element;

export { Card };
