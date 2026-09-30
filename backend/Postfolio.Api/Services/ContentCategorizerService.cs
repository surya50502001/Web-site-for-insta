using System;
using System.Collections.Generic;
using System.Linq;

namespace Postfolio.Api.Services
{
    public interface IContentCategorizerService
    {
        string CategorizePost(string caption, string mediaType);
    }

    public class ContentCategorizerService : IContentCategorizerService
    {
        private static readonly Dictionary<string, string[]> CategoryKeywords = new()
        {
            ["Weddings"] = new[]
            {
                "wedding", "bride", "groom", "vows", "ceremony", "aisle", "altar",
                "veil", "bridal", "destination wedding", "lake como", "tuscany",
                "chateau", "villa", "newlyweds", "matrimony", "first kiss", "reception"
            },
            ["Pre-Weddings"] = new[]
            {
                "pre-wedding", "prewedding", "engagement", "proposal", "engaged",
                "save the date", "lovers", "elopement", "prewed", "couple session", "santorini"
            },
            ["Portraits"] = new[]
            {
                "portrait", "headshot", "editorial", "studio", "model", "vogue",
                "harper", "daylight study", "natural light", "window light", "skin texture", "monochrome"
            },
            ["Events"] = new[]
            {
                "event", "gala", "party", "celebration", "midnight", "champagne",
                "orchestra", "festival", "conference", "red carpet", "awards"
            },
            ["Commercial"] = new[]
            {
                "commercial", "campaign", "lookbook", "brand", "advertising", "atelier",
                "autumn campaign", "cashmere", "collection", "client", "product"
            },
            ["Candid"] = new[]
            {
                "candid", "unposed", "unstaged", "raw emotion", "in-between", "street",
                "spontaneous", "first dance", "pier"
            }
        };

        public string CategorizePost(string caption, string mediaType)
        {
            if (string.IsNullOrWhiteSpace(caption))
                return "Portraits";

            var cleanCaption = caption.ToLowerInvariant();
            string bestCategory = "Portraits";
            int maxScore = 0;

            foreach (var (category, keywords) in CategoryKeywords)
            {
                int score = 0;
                foreach (var kw in keywords)
                {
                    if (cleanCaption.Contains(kw))
                    {
                        score += kw.Contains(' ') ? 3 : 2;
                    }
                }

                if (score > maxScore)
                {
                    maxScore = score;
                    bestCategory = category;
                }
            }

            if (maxScore == 0 && (cleanCaption.Contains("love") || cleanCaption.Contains("forever")))
            {
                return "Weddings";
            }

            return bestCategory;
        }
    }
}
